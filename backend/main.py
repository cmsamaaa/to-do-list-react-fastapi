from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Item(BaseModel):
    title: str
    content: str | None = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

temp_mem = {
    "test1": "msg1",
    "test2": "msg2",
    "test3": "msg3"
}


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

@app.post("/todo/create")
def create_todo(item: Item):
    resMsg = None
    resContent = None

    if item.title in temp_mem.keys():
        resMsg = "Title already exists!"
    else:
        temp_mem[item.title] = item.content
        resMsg = "Successfully added into list!"
        resContent = temp_mem[item.title]

    return {"msg": resMsg, "content": resContent}

@app.get("/todo")
def view_all_todo():
    return temp_mem

@app.get("/todo/{title}")
def get_todo(title: str):
    if title in temp_mem.keys():
        return {"msg": temp_mem[title]}
    else:
        return {"msg": "Key does not exist!"}

@app.post("/todo/update")
def update_todo(item: Item):
    resMsg = None
    resContent = None

    if item.title in temp_mem.keys():
        temp_mem[item.title] = item.content
        resMsg = "Successfully updated!"
        resContent = temp_mem[item.title]
    else:
        resMsg = "Title doesn't exist!"

    return {"msg": resMsg, "content": resContent}

@app.post("/todo/delete")
def delete_todo(item: Item):
    resMsg = None
    deleted_item = None
    if item.title in temp_mem.keys():
        deleted_item = temp_mem.pop(item.title)
        resMsg = "Successfully removed from to-do list!"
    else:
        resMsg = "Title doesn't exist!"

    return {"msg": resMsg, "title": item.title, "content": deleted_item}