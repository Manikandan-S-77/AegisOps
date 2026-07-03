from services.loader import build_all_documents
from services.embedding import generate_embedding
from services.vectordb import add_documents


print("Loading enterprise knowledge...")

ids, documents = build_all_documents()

embeddings = []

for document in documents:

    embedding = generate_embedding(document)

    embeddings.append(embedding)

print("Embeddings generated.")

add_documents(
    ids=ids,
    documents=documents,
    embeddings=embeddings
)

print("Knowledge Base Indexed Successfully!")