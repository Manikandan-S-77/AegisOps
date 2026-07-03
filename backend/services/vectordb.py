import chromadb

chroma_client = chromadb.PersistentClient(
    path="chroma_db"
)


collection = chroma_client.get_or_create_collection(
    name="enterprise_knowledge"
)


def add_documents(ids, documents, embeddings):
    """
    Store documents and embeddings in ChromaDB.
    """

   
    existing = collection.get()

    if existing["ids"]:
        collection.delete(ids=existing["ids"])

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings
    )


def search(query_embedding, n_results=3):
    """
    Search similar documents.
    """

    return collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )