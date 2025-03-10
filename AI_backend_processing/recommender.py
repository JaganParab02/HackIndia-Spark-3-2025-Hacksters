from utils import get_embedding
from sklearn.metrics.pairwise import cosine_similarity
import DB_extractions

# Fetch stored documents and embeddings
documents = DB_extractions.documents
embeddings = DB_extractions.embeddings

def recommend_similar_docs(doc_text, k=2):
    query_embedding = get_embedding(doc_text).reshape(1, -1)
    similarities = cosine_similarity(query_embedding, embeddings)
    top_k = similarities.argsort()[0][-k:]
    return [documents[i] for i in top_k]
