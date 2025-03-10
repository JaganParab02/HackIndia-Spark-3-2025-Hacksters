# HackIndia-Spark-3-2025-Hacksters

This project is an AI-powered document search and retrieval system that allows users to search for various document formats (PDF, DOCX, PPTX) and efficiently retrieve relevant information. It uses technologies like semantic search, text summarisation, and question-answering models.
The backend is built on Django REST Framework, integrated with FAISS for fast similarity searches and transformer-based NLP models for intelligent search, Q&A, and summarization.

Features ✅
•	Search and retrieval of Documents (Supports PDF, DOCX, PPTX)
•	Semantic Search using Sentence Transformers
•	Text Summarization to extract key insights from documents
•	Natural Language Question-Answering to retrieve precise answers from uploaded files
•	AI-driven recommendations based on context similarity

Tech Stack 🛠
Backend Technologies:
•	Django REST Framework – API development
•	FAISS – Fast Approximate Nearest Neighbor search in high-dimensional spaces
•	Transformers (Hugging Face) – NLP model integration
•	Sentence Transformers – For semantic embeddings

Models Used:
•	all-mpnet-base-v2 – For semantic search
•	facebook/bart-large-cnn – For text summarization
•	cross-encoder/ms-marco-MiniLM-L-6-v2 – For relevance scoring
•	deepset/roberta-base-squad2 – For question-answering

Folder Structure
project_root/  
│── backend/                   # Django backend  
│   ├── settings.py            # Configuration settings  
│   ├── urls.py                # API endpoint routing  
│   ├── views.py               # API view functions  
│   ├── extract_text.py        # Extracts text from documents  
│   ├── models.py              # Loads ML models  
│   ├── utils.py               # Utility functions  
│   ├── serializers.py         # Formats API requests/responses  
│   ├── tests.py               # Unit tests  
│   ├── requirements.txt       # Dependencies  
│   └── ...  
│  
│── frontend/                  # React/Vue frontend (if applicable)  
│── manage.py                  # Django management script  
│── README.md                  # Project documentation  


Git Commands 

git clone https://github.com/your-username/document-search-ai.git  
cd document-search-ai  


python -m venv venv  
source venv/bin/activate  # Mac/Linux  
venv\Scripts\activate     # Windows  

pip install -r requirements.txt  

python manage.py migrate  
python manage.py runserver  

