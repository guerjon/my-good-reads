import React from "react";
import '../styles/Book.scss';

export interface IBook  {
    id: string,
    title: string,
    image?: string,
    authors?: string[],
    publisher?: string,
    published?: string,
    description?: string
}

export class Book extends React.PureComponent<IBook> {
    public render() {
        const {title, image, authors, publisher, published, description} = this.props;
        return (
            <div className="book-container">
                <div className="book-image-container"> 
                    <img src={image}/>
                </div>
                <div className="book-info-container">
                    <h1>{title}</h1>
                    <div className="book-authors-container">
                        {authors && authors?.map((author, index) => index == authors.length - 1 ? (<b>{author}</b>) : <b> {author}, &nbsp;</b> )}
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