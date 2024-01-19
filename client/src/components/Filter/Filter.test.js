import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Filter from './Filter';

describe('Filter component', () => {
  test('renders sort dropdown', () => {
    render(<Filter />);
    
    // Check if the sort dropdown is rendered
    const sortDropdown = screen.getByLabelText('Sort by');
    expect(sortDropdown).toBeInTheDocument();
    
    // Check if the sort dropdown has the correct options
    const sortOptions = screen.getAllByRole('option');
    expect(sortOptions).toHaveLength(3); // Including the default "Select" option
    expect(sortOptions[0]).toHaveTextContent('Select');
    expect(sortOptions[1]).toHaveTextContent('Increase');
    expect(sortOptions[2]).toHaveTextContent('Decrease');
  });
  
  test('updates sortBy state when sort option is selected', () => {
    render(<Filter />);
    
    // Select the "Increase" sort option
    const sortDropdown = screen.getByLabelText('Sort by');
    fireEvent.change(sortDropdown, { target: { value: 'increase' } });
    expect(sortDropdown.value).toBe('increase');
    
    // Select the "Decrease" sort option
    fireEvent.change(sortDropdown, { target: { value: 'decrease' } });
    expect(sortDropdown.value).toBe('decrease');
  });
  
  test('updates inputEnd state when price range input is changed', async () => {
    // Mocking the API call to avoid making actual network requests
    jest.mock('../../axios/customAxios', () => ({
      __esModule: true,
      default: {
        get: jest.fn(() => Promise.resolve({ data: { data: [] } })),
      },
    }));
  
    // Mock the setInputEnd function
    const setInputEndMock = jest.fn();
    
    render(
      <Filter
        inputEnd={0}
        setInputEnd={setInputEndMock}
        checkedCategories={[]}
        handleCheckCategory={() => {}}
        sortBy=""
        handleSortChange={() => {}}
      />
    );
    
  
    // Wait for asynchronous operations to complete
    await waitFor(() => {
      // Find the range input and change its value
      const rangeInput = screen.getByRole('slider');
      fireEvent.change(rangeInput, { target: { value: '25' } });
  
      // Assert that setInputEndMock has been called with the correct value
      expect(setInputEndMock).toHaveBeenCalledWith('25');
    });
  });

  test('renders price range input', () => {
    render(<Filter />);
    
    // Check if the price range input is rendered
    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toBeInTheDocument();
  });
});