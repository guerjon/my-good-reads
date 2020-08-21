import React from 'react';

import { render, cleanup, RenderResult } from '@testing-library/react'
import { BookList } from './book-search/BookList';

describe('render the books list correctly',() => {
    const mock = jest.fn(() => {});
    const books = [
        {
            id:'1',
            title:'title',
            index: 0 ,
            addBookToWishList: mock,
            description: 'description',
            hideWishListButton: false,
            published: '2016-11-05',
        },
        {
            id:'2',
            title:'title',
            index: 0 ,
            addBookToWishList: mock,
            description: 'description',
            hideWishListButton: false,
            published: '2016-11-05',
        }
    ] ;

    const wishListBooks = [
        {
            id:'2',
            title:'title',
            index: 0 ,
            addBookToWishList: mock,
            description: 'description',
            hideWishListButton: false,
            published: '2016-11-05',
        }
    ];


    const props = {
        addBookToWishList: () => {},
        books,
        wishListBooks
    }

    let bookList: RenderResult;

    beforeEach(() => {
        bookList = render(
            <BookList  {...props}/>
        )
    });

    afterEach(() => {
        cleanup();
    })

    it('should test render book list correctly', () => {
        expect(bookList.container.querySelectorAll('ul')).toHaveLength(1);
        expect(bookList.container.querySelectorAll('li')).toHaveLength(2);
    });
});

