import React, { useEffect, useState } from "react";
import { getBooksByType } from "./book-search.service";
import { Book, IBook } from "./Book";
import { BookList, IBookList } from "./BookList";

const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState<IBook[]>([]);

    useEffect(() => {
        async function getAllBooks() {
            if (bookTypeToSearch) {
                const test = await getBooksByType(bookTypeToSearch);
                const { items } = await getBooksByType(bookTypeToSearch);
                if (items) {                        
                    const searchResult: IBook[] = [];
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
        }

        getAllBooks();
    }, [bookTypeToSearch]);

    return (
            <>
                <div className="book--container">
                    <div className="search-params">
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    updateBookTypeToSearch(bookType)
                                }}
                            >
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={e => updateBookType(e.target.value)}
                                />
                            </form>
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
                </div>
                {                
                    <BookList books={allAvailableBooks} />
                }
            </>
    );
};

export default BookSearch;
