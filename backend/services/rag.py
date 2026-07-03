from services.embedding import generate_embedding
from services.vectordb import search


def retrieve_context(question: str):

    query_embedding = generate_embedding(question)

    results = search(query_embedding)

    print("\nSEARCH RESULTS\n")
    print(results)

    documents = results["documents"][0]

    context = "\n\n".join(documents)

    return context