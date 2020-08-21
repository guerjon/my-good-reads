import React from "react";
import '../styles/Book.scss';

export interface BookType  {
    id: string,
    title: string,
    image?: string,
    authors?: string[],
    publisher?: string,
    published?: string,
    description?: string,
}

export interface BookActions {
    addBookToWishList: ( index: number ) => void,
    index: number,
    hideWishListButton: boolean
}

export class Book extends React.PureComponent<BookType & BookActions> {
    public render() {
        const {title, image, authors, publisher, published, description, index, hideWishListButton} = this.props;
        return (
            <div className="book-container">
                <div className="book-image-wishlist-button-container">
                    <div className="book-image-container"> 
                        <img alt={title} src={image}/>
                    </div>
                    {
                        !hideWishListButton && (
                            <div className='book-wishlist-button-container'>
                                <button type="button" onClick={() => this.props.addBookToWishList(index) }>Add to wishlist</button>
                            </div>
                        )
                    }
                </div>
                <div className="book-info-container">
                    <h1>{title}</h1>
                    <div className="book-authors-container">
                        {authors && authors?.map((author, index) => index === authors.length - 1 ? (<b key={index}>{author}</b>) : <b key={index}> {author}, &nbsp;</b> )}
                    </div>
                    <div className='book-publisher'><p>{publisher} &nbsp;</p> <p>{this.formatDate(published)}</p></div>
                    <p>{description}</p>
                </div>
            </div>
        )
    }

    private formatDate(date?: string) {
        if (date) {
            const d = new Date(date);
            return d.getFullYear();    
        }
        return '';
    }
};