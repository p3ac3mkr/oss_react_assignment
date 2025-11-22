import {useState} from 'react';

const DrawData = (props) => {
    return(
        <>
            <div className="row gx-0" id="row-bottoms">
                <div className="col-2 col-xs-2 col-md-1 col-lg-1 p">{props.priority}</div>
                <div className="col-4 col-xs-4 col-md-4 col-lg-4 title">{props.name}</div>
                <div className="col-3 col-xs-3 col-md-2 col-lg-2 author">{props.author}</div>
                <div className="col-3 col-xs-3 col-md-2 col-lg-2 publisher">{props.publisher}</div>
                <div className="col-1 col-xs-2 col-md-1 col-lg-1 theme">{props.theme}</div>
                <div className="col-1 col-xs-1 col-md-1 col-lg-1 year">{props.year}</div>
                <div className="col-1 col-xs-1 col-md-1 col-lg-1 started">{props.started}</div>
            </div>
        </>
    );
}

const Contents = () => {
    const [books, setBooks] = useState([]);
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

    return(
        <>
            <div className="div_contents" id="div_contents">
                <div className="row gx-0">
                    <div className="col-2 col-xs-2 col-md-1 col-lg-1 p">#p</div>
                    <div className="col-4 col-xs-4 col-md-4 col-lg-4">title</div>
                    <div className="col-3 col-xs-3 col-md-2 col-lg-2 author">author</div>
                    <div className="col-3 col-xs-3 col-md-2 col-lg-2 publisher">publisher</div>
                    <div className="col-1 col-xs-2 col-md-1 col-lg-1 theme">theme</div>
                    <div className="col-1 col-xs-1 col-md-1 col-lg-1 year">year</div>
                    <div className="col-1 col-xs-1 col-md-1 col-lg-1 started">started</div>
                </div>
                {books.map((x, index) => <DrawData key={index} {...x}/>)}
            </div>
            <hr id="hr_index_footer"/>
        </>
    );
}

export default Contents;