from sklearn.metrics.pairwise import cosine_similarity
from models import search_model, summarizer, recommendation_model, qa_model  # Import preloaded models

def get_embedding(text):
    """Generate embedding using the preloaded model."""
    return search_model.encode(text, convert_to_numpy=True)

def summarize_text(text, max_length=150, min_length=50):
    """Summarizes long documents into key points."""
    try:
        summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
        return summary[0]["summary_text"]
    except Exception as e:
        return f"Error in summarization: {str(e)}"

def get_recommendations(doc_text, doc_list, top_k=3):
    """
    Find top-k most relevant documents using Cross-Encoder.
    """
    # Create query-document pairs
    query_doc_pairs = [(doc_text, doc) for doc in doc_list]

    # Get relevance scores
    scores = recommendation_model.predict(query_doc_pairs)

    # Get top-k highest scoring documents
    top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:top_k]

    return [doc_list[i] for i in top_indices]

def answer_question(context, question):
    """Extracts answers from a document based on user query using a Q&A model."""
    try:
        result = qa_model(question=question, context=context)
        if result["score"] < 0.3:  # Filter out low-confidence answers
            return "No answer found"
        return result["answer"]
    except Exception as e:
        return f"Error in Q&A: {str(e)}"

def preprocess_text(text):
    """Preprocess text: Remove extra spaces, convert to lowercase, and normalize."""
    return " ".join(text.strip().split()).lower()
