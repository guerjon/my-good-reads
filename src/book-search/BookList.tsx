import { BookType, Book } from "./Book";
import React from 'react';
import '../styles/BookList.scss';


export interface IBookList {
    books: BookType[],
    wishListBooks: BookType[],
    addBookToWishList: ( index: number ) => void,
} 

export class BookList extends React.PureComponent<IBookList> {
    public render() {
        return (
            <ul className="book-list">
                {
                    this.props.books.map((book: BookType, index: number) => {
                        const hideWishListButton = this.props.wishListBooks.find(wishListBook => book.id === wishListBook.id) ? true : false;
                        return(
                            <li key={index}>
                                <Book hideWishListButton={hideWishListButton} index={index} addBookToWishList={this.props.addBookToWishList} {...book} />
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}
