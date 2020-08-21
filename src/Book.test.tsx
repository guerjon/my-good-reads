import React from 'react';

import { render, fireEvent, cleanup, screen, getByTestId } from '@testing-library/react'
import { Book } from './book-search/Book';

describe('should contain test related to book test',() => {
    const mock = jest.fn(() => {});
    const props = {
        id:'test',
        title:'title',
        index: 0 ,
        addBookToWishList: mock,
        description: 'description',
        hideWishListButton: false,
        published: '2016-11-05',
    };

    let book;

    beforeEach(() => {
        book = render(
            <Book  {...props}/>
        )
    });

    afterEach(() => {
        cleanup();
    })

    it('should test render book correctly', () => {
        expect(screen.getByTestId('book-title').textContent).toBe('title');
        expect(screen.getByTestId('book-description').textContent).toBe('description');
        expect(screen.getByTestId('published-date').textContent?.trim()).toBe('2016');
    });

    it('should hide the wishListButton', () => {
        const props = {
            id:'test',
            title:'title',
            index: 0 ,
            addBookToWishList: mock,
            description: 'description',
            hideWishListButton: true,
            published: '2016-11-05',
        };

        expect(screen.getByTestId('wishlist-button')).toBeInTheDocument();
    });

    it('should click wishlist button and call the mock', () => {
        fireEvent.click(screen.getByTestId('wishlist-button'));
        expect(mock).toHaveBeenCalledTimes(1);
    })
});
