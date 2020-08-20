import { IBook, Book } from "./Book";
import React from 'react';
import '../styles/BookList.scss';


export interface IBookList {
    books: IBook[]
} 

export class BookList extends React.PureComponent<IBookList> {
    public render() {
        return (
            <ul className="book-list">
                {
                    this.props.books.map((book: IBook) => (
                        <li key={book.id}>
                            <Book {...book} />
                        </li>
                    ))
                }
            </ul>
        )
    }
}
