import React from 'react';
import '../styles/WishList.scss';
import { BookType } from './Book';

export interface IWishList {
    books: BookType[],
    addBookToWishList: (index: number) => void 
}

export class WishList extends React.PureComponent<IWishList>{
    render() {
        
        const { books } = this.props;

        return(
            <div className='book-list'>
                <p>My wishing list ({books.length})</p>
                <hr/>
                {books.map((book, index) => {
                    return(
                        <div key={index} className='book-list-wishlist'>
                            <p> {book.title} </p>
                            <a role='button' onClick={() => this.props.addBookToWishList(index)}>x</a>
                        </div>
                    );
                })}
            </div>  
        );  
    }
}