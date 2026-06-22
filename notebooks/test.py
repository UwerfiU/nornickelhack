from langchain_openai import ChatOpenAI
import time


llm = ChatOpenAI(
    base_url="http://localhost:8000/v1",
    api_key="token-not-needed",
    model="alegchenko/command-r-08-2024-awq-ru-calib",
    temperature=0.3,
    max_tokens=1024
)

while True:
    query = input("Запрос: ")
    if query == "stop":
        break
    st = time.time()
    response = llm.invoke(query)
    tt = time.time() - st
    print(f"Ответ: {response.content}")
    print(response.usage_metadata)
    print(f"время ответа: {tt:.3f}")