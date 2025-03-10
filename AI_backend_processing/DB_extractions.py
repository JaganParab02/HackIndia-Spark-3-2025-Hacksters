import psycopg2
import numpy as np

conn = psycopg2.connect(database="your_db", user="your_user", password="your_pass", host="localhost", port="5432")
cur = conn.cursor()

# Fetch all documents
cur.execute("SELECT id, content, embedding FROM documents")
rows = cur.fetchall()

# Ensure documents and embeddings are properly stored
documents = {row[0]: row[1] for row in rows}  # {id: text}
embeddings = np.array([np.frombuffer(row[2], dtype=np.float32) for row in rows])  # Convert stored binary to numpy array

cur.close()
conn.close()
