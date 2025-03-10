import numpy as np
import faiss
from models import search_model  # Import preloaded model
from DB_extractions import documents  # Import stored documents


def get_embedding(text):
    """Generate embedding using the preloaded model."""
    return search_model.encode(text, convert_to_numpy=True)


# Load stored embeddings and create FAISS index
embeddings = np.array([get_embedding(doc["text"]) for doc in documents]).astype('float32')

# Initialize FAISS index
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)


def search_documents(query, k=2):
    """Search for the top-k most similar documents based on embeddings."""
    query_embedding = np.array([get_embedding(query)]).astype('float32')
    _, indices = index.search(query_embedding, k)

    return [documents[i] for i in indices[0]]
