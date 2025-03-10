import torch
from transformers import pipeline
from sentence_transformers import SentenceTransformer, CrossEncoder

# Set device for efficient computation
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load models once in this file
search_model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2", device=device)
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0 if torch.cuda.is_available() else -1)
recommendation_model = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")  # Corrected to CrossEncoder
qa_model = pipeline("question-answering", model="deepset/roberta-base-squad2", device=0 if torch.cuda.is_available() else -1)
