import React from 'react';

import { render, fireEvent, cleanup, screen, getByTestId } from '@testing-library/react'
import BookSearch from './book-search/BookSearch';

describe('should contain test related to book search',() => {
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

    let bookSearch;

    beforeEach(() => {
        bookSearch = render(
            <BookSearch/>
        )
    });

    afterEach(() => {
        cleanup();
    })

    it('should test render book search correctly', () => {
        // to do
    });
});

