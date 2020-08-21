import React, { useEffect, useState, useReducer, ChangeEvent } from "react";
import { getBooksByType } from "./book-search.service";
import { BookType } from "./Book";
import { BookList } from "./BookList";
import { WishList } from "./WishList";

const timeout = 500;
let timeOutId: NodeJS.Timeout;

const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState<BookType[]>([]);
    const [wishList, setWishListBooks] = useState<BookType[]>([]); 

    useEffect(() => {
        async function getAllBooks() {
            if (bookTypeToSearch) {
                const { items } = await getBooksByType(bookTypeToSearch);
                if (items) {                        
                    const searchResult: BookType[] = [];
                    items.forEach((book: any) => {
                        const { volumeInfo } = book;
                        searchResult.push({
                            image: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '',
                            title: volumeInfo.title,
                            authors: volumeInfo.authors,
                            publisher: volumeInfo.publisher,
                            published: volumeInfo.publishedDate,
                            description: volumeInfo.description,
                            id: book.id
                        });
                    });
                    
                    setAllAvailableBooks(searchResult);
    
                } else {
                    // throw error; 
                }

            }
            if (timeOutId && timeOutId.hasRef) 
                clearTimeout(timeOutId);
        }

        getAllBooks();
    }, [bookTypeToSearch]);

    useEffect(() => {
        if(bookType) {
            if (timeOutId && timeOutId.hasRef) 
                clearTimeout(timeOutId);
            else {
                timeOutId = setTimeout(() => updateBookTypeToSearch(bookType), timeout);
            }
        } else {
            setAllAvailableBooks([]);
        }

    } , [bookType]);

    const removeBookFromWishList = (index: number)  => {
        const books = wishList.slice();
        books.splice(index, 1);
        setWishListBooks(books);
    }

    const addBookToWishList = (index: number) => {
        const books = wishList.slice();
        books.push(allAvailableBooks[index]);
        setWishListBooks(books);
    }

    return (
            <div>
                <div className="book--container">
                    <div className="search-params">
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    
                                }}
                            >
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateBookType(e.target.value)}
                                />
                            </form>


                        </div>
                    </div>
                </div>
                
                <div className="list-whishlist-container">
                    {allAvailableBooks.length > 0 && (
                        <div className="list">
                            <BookList wishListBooks={wishList} addBookToWishList={addBookToWishList} books={allAvailableBooks} />
                        </div>
                    )}
                    {wishList.length > 0 && (
                        <div className="wish-list">
                            <WishList books={wishList} addBookToWishList={removeBookFromWishList} />
                        </div>
                    )}
                    
                    {!bookType && (
                                <div className="empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <a onClick={() => {
                                                updateBookType("Javascript");
                                            }}
                                        >
                                            {" "}
                                            "Javascript"
                                        </a>
                                    </p>
                                </div>
                            )}                        
                   
                </div>
            </div>
    );
};

export default BookSearch;
