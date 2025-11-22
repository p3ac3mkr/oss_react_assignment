import {useState} from 'react';

const DrawData = (props) => {
    return(
        <>
        <div className="row gx-0" id="row-bottoms">
            <div className="col-2 col-xs-2 col-md-1 col-lg-1 id">{props.id}</div>
            <div className="col-2 col-xs-2 col-md-1 col-lg-1 p">{props.priority}</div>
            <div className="col-4 col-xs-4 col-md-4 col-lg-4 title">{props.name}</div>
            <div className="col-3 col-xs-3 col-md-2 col-lg-2 author">{props.author}</div>
            <div className="col-3 col-xs-3 col-md-2 col-lg-2 publisher">{props.publisher}</div>
            <div className="col-1 col-xs-2 col-md-2 col-lg-2 theme">{props.theme}</div>
        </div>
        </>
    );
}

const ToolBar = () => {
    const [books, setBooks] = useState([]);
    const [inputs, setInputs] = useState({
        id: '',
        priority: '',
        name: '',
        author: '',
        publisher: '',
        theme: '',
        year: '',
        started: ''
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    if (books.length === 0){
        const xhr = new XMLHttpRequest();
        xhr.open("GET","https://6918702421a96359487009b4.mockapi.io/books/");
        xhr.setRequestHeader("content-type","application/json");
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                const res = JSON.parse(xhr.response);
                setBooks(res);
            } else {
                console.log(xhr.status, xhr.statusText);
            }
        }
    }

    const addBook = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST","https://6918702421a96359487009b4.mockapi.io/books/");
        xhr.setRequestHeader("content-type","application/json");
        const {id, ...addData} = inputs;
        xhr.send(JSON.stringify(addData));

        xhr.onload = () => {
            if (xhr.status === 201) {
                const res = JSON.parse(xhr.response);
                setBooks(prev => [...prev, res]);
                alert("게시물이 추가되었습니다.");
                setInputs({id: '', priority: '', name: '', author: '', publisher: '', theme: '', year: '', started: ''});
            } else {
                console.log(xhr.status, xhr.statusText);
            }
        }
    }

    const editBook = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT","https://6918702421a96359487009b4.mockapi.io/books/" + inputs.id);
        xhr.setRequestHeader("content-type","application/json");
        const {id, ...editData} = inputs;
        xhr.send(JSON.stringify(editData));

        xhr.onload = () => {
            if (xhr.status === 200) {
                const res = JSON.parse(xhr.response);
                setBooks(prev => prev.map(book => book.id === inputs.id === inputs.id? res : book));
                alert("게시물이 수정되었습니다.");
                setInputs({id: '', priority: '', name: '', author: '', publisher: '', theme: '', year: '', started: ''});
            } else {
                console.log(xhr.status, xhr.statusText);
            }
        }
    }

    const deleteBook = () => {
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", "https://6918702421a96359487009b4.mockapi.io/books/" + inputs.id);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send();

            xhr.onload = () => {
            if (xhr.status === 200) {
                setBooks(prev => prev.filter(book => book.id !== inputs.id));
                alert("게시물이 삭제되었습니다.");
                setInputs({ id: '', priority: '', name: '', author: '', publisher: '', theme: '', year: '', started: '' });
            } else {
                console.log(xhr.status, xhr.statusText);
            }
        }
    }

    return(
        <>
            <div className="div_tools">
                <div className="container searchbar">
                    <form name="search" method="POST" className="d-flex align-items-center gap-2">
                        <input type="text" className="form-control w-80" placeholder="search"/>
                        <button type="button" className="btn btn-outline-secondary">search</button>
                    </form>
                </div>

                <div className="container add">
                    <button className="btn btn-secondary" type="button" id="buttonRevise" data-bs-toggle="modal" data-bs-target="#addModal">리스트 수정</button>
                </div>
            </div>

            <div className="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addModalLabel">Add to read list</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="modal-body">
                            <div className="row gx-0">
                                <div className="col-2 col-xs-2 col-md-1 col-lg-1 p">id</div>
                                <div className="col-2 col-xs-2 col-md-1 col-lg-1 p">#p</div>
                                <div className="col-4 col-xs-4 col-md-4 col-lg-4">title</div>
                                <div className="col-3 col-xs-3 col-md-2 col-lg-2 author">author</div>
                                <div className="col-3 col-xs-3 col-md-2 col-lg-2 publisher">publisher</div>
                                <div className="col-1 col-xs-2 col-md-2 col-lg-2 theme">theme</div>
                            </div>
                            {books.map((x, index) => <DrawData key={x.id} {...x}/>)}
                        </div>
                        <div id="div_btn_refresh">
                            <button className="btn btn-secondary" id="edit_refresh" onClick={() => setBooks([])}>목록 새로고침</button>
                        </div>
                        <div className="modal-footer">
                            <form name="revise_book" method="POST" id="revise_book">
                                <div className="row">
                                    <div className="input-group mb-3" id="search_to_edit">
                                        <label className="form-label" htmlFor="book_to_edit">book to edit or delete</label>
                                        <div className="col-12 name"><input type="text" className="form-control" id="book_to_edit" placeholder="book id" name="id" value={inputs.id} onChange={handleChange}/></div>
                                    </div>
                                    <div className="input-group mb-3" id="add_bookname">
                                        <label className="form-label" htmlFor="book_name">name of the book</label>
                                        <div className="col-12 name"><input type="text" className="form-control" id="book_name" placeholder="name" name="name" value={inputs.name} onChange={handleChange}/></div>
                                    </div>
                                    <div className="input-group mb-3" id="add_bookinfo1">
                                        <div className="col-12 col-md-6 col-lg-6 label"><label className="form-label" htmlFor="book_theme">theme of the book</label></div>
                                        <div className="col-12 col-md-6 col-lg-6 label"><label className="form-label" htmlFor="book_author">author of the book</label></div>
                                        <div className="col-12 col-md-6 col-lg-6 info"><input type="text" className="form-control" id="book_theme" placeholder="theme" name="theme" value={inputs.theme} onChange={handleChange}/></div>
                                        <div className="col-12 col-md-6 col-lg-6 info"><input type="text" className="form-control" id="book_author" placeholder="author" name="author" value={inputs.author} onChange={handleChange}/></div>
                                    </div>
                                    <div className="input-group mb-3" id="add_bookinfo2">
                                        <div className="col-12 col-md-6 col-lg-6 label"><label className="form-label" htmlFor="book_publisher">publisher of the book</label></div>
                                        <div className="col-12 col-md-6 col-lg-6 label"><label className="form-label" htmlFor="book_year">published year</label></div>
                                        <div className="col-12 col-md-6 col-lg-6 info"><input type="text" className="form-control" id="book_publisher" placeholder="publisher" name="publisher" value={inputs.publisher} onChange={handleChange}/></div>
                                        <div className="col-12 col-md-6 col-lg-6 info"><input type="text" className="form-control" id="book_year" placeholder="published in" name="year" value={inputs.year} onChange={handleChange}/></div>
                                    </div>
                                    <div className="input-group" id="add_bookinfo3">
                                        <div className="col-12 col-md-6 col-lg-6 label"><label className="form-label" htmlFor="book_priority">priority of the book</label></div>
                                        <div className="col-12 col-md-6 col-lg-6 label"><label className="form-label" htmlFor="book_started">started date</label></div>
                                        <div className="col-12 col-md-6 col-lg-6 info"><input type="number" className="form-control" id="book_priority" placeholder="priority" name="priority" value={inputs.priority} onChange={handleChange}/></div>
                                        <div className="col-12 col-md-6 col-lg-6 info"><input type="date" className="form-control" id="book_started" name="started" value={inputs.started} onChange={handleChange}/></div>
                                    </div>
                                </div>
                            </form>
                            
                            <button type="button" className="btn btn-primary" id="add-book-btn" onClick={addBook}>add</button>
                            <button type="button" className="btn btn-primary" id="edit-book-btn" onClick={editBook}>edit</button>
                            <button type="button" className="btn btn-primary" id="delete-book-btn" onClick={deleteBook}>delete</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToolBar;