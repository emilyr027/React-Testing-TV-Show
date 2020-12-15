import React from 'react';
import App from './App';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchShow as mockFetchShow } from './api/fetchShow';

//do mock of async function
jest.mock('./api/fetchShow');

const episodesData = {
    data: {
        name: "Person of Interest",
        summary: "You are being watched. The government has a secret system...",
        image: {
            original: "http://static.tvmaze.com/uploads/images/original_untouched/35/89093.jpg"
        },
        _embedded: {
            episodes: [
                {
                    season: 1,
                    number: 1
                },
                {
                    season: 1,
                    number: 2
                },
                {
                    season: 2,
                    number: 1
                },
                
            ]
        }
    }
};

//async/await 
test("clicking on the button fetches data and renders it to the DOM", async () => {
    // mock the resolved data
    mockFetchShow.mockResolvedValueOnce(episodesData);
    //render the component
    const { getByText, queryAllByRole } = render(<App />);

    //await waitFor --- the data to be fetched
    await waitFor(() => {});
    expect(mockFetchShow).toHaveBeenCalledTimes(1);

    // user can click the dropdown menu
    userEvent.click(getByText(/select a season/i));

    // 2 seasons are available in dropdown list
    const options = queryAllByRole(/option/i);
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("Season 1");
    expect(options[1]).toHaveTextContent("Season 2");
})



