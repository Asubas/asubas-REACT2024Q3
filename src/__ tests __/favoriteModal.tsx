// import '@testing-library/jest-dom';
// import { act, fireEvent, screen } from '@testing-library/react';
// import { useSelector, useDispatch, useStore } from 'react-redux';
// import { useLocation, useNavigate, MemoryRouter } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// // import { FavoriteModal } from '../components/contentSection/favoriteModal/favoriteModal';
// // import { removeFavorite } from '../app/slices/favoriteSlice';
// import { renderWithRedux } from '../tests/test-utils';
// import { ContentSection } from '../components/contentSection/contentSection';

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: jest.fn(),
//   useStore: jest.fn(),
// }));

// jest.mock('react-router-dom', () => ({
//   useLocation: jest.fn(),
//   useNavigate: jest.fn(),
// }));

// const mockFavoriteDogsArray = {
//   initFavoriteArr: [
//     {
//       id: '1',
//       breeds: [
//         {
//           name: 'Golden Retriever',
//         },
//       ],
//       url: 'https://example.com/dog1.jpg',
//       width: 200,
//       height: 200,
//     },
//   ],
// };

// const mockDispatch = jest.fn();
// const mockNavigate = jest.fn();
// const mockLocation = { pathname: '/favorites' };
// const mockStore = configureStore()({ favorite: mockFavoriteDogsArray });

// describe('FavoriteModal', () => {
//   beforeEach(() => {
//     (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
//       return callback({ favorite: mockFavoriteDogsArray });
//     });
//     (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
//     (useLocation as jest.Mock).mockReturnValue(mockLocation);
//     (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
//     (useStore as unknown as jest.Mock).mockReturnValue(mockStore);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   it('should render the modal with favorite dogs', async () => {
//     const { element } = renderWithRedux(
//       <MemoryRouter initialEntries={['/page1']}>
//         <ContentSection />
//       </MemoryRouter>,
//     );
//     expect(element).toBeDefined();
//     await act(async () => {
//       //   const checkbox = screen.getByTestId('checkbox-input');
//       fireEvent.click(screen.getByTestId('checkbox-input'));
//     });
//     const modal = screen.getByText(/Congratulations! You feed these dogs!/i);
//     expect(modal).toBeInTheDocument();

//     const dogName = screen.getByText(/Golden Retriever/i);
//     expect(dogName).toBeInTheDocument();

//     const dogImage = screen.getByAltText(/Dog 1/i);
//     expect(dogImage).toBeInTheDocument();
//     expect(dogImage).toHaveAttribute('src', 'https://example.com/dog1.jpg');
//   });

//   //   it('should call dispatch and navigate when reset button is clicked', async () => {
//   //     const checkbox = screen.getByRole('checkbox');
//   //     await act(async () => {
//   //       fireEvent.click(checkbox);
//   //     });
//   //     renderWithRedux(
//   //       <MemoryRouter initialEntries={['/page1']}>
//   //         <FavoriteModal />
//   //       </MemoryRouter>,
//   //     );

//   //     const resetButton = screen.getByRole('button', { name: /Reset store/i });
//   //     fireEvent.click(resetButton);

//   //     expect(mockDispatch).toHaveBeenCalledWith(
//   //       removeFavorite(mockFavoriteDogsArray.initFavoriteArr[0]),
//   //     );
//   //     expect(mockNavigate).toHaveBeenCalledWith('/favorites');
//   //   });

//   //   it('should close the modal when close button is clicked', async () => {
//   //     const checkbox = screen.getByRole('checkbox');
//   //     await act(async () => {
//   //       fireEvent.click(checkbox);
//   //     });
//   //     renderWithRedux(
//   //       <MemoryRouter initialEntries={['/page1']}>
//   //         <FavoriteModal />
//   //       </MemoryRouter>,
//   //     );

//   //     const closeButton = screen.getByRole('button', { name: /dog svg/i });
//   //     fireEvent.click(closeButton);

//   //     const modal = screen.queryByText(/Congratulations! You feed these dogs!/i);
//   //     expect(modal).not.toBeInTheDocument();
//   //   });

//   //   it('should render the DownloadButton', async () => {
//   //     const checkbox = screen.getByRole('checkbox');
//   //     await act(async () => {
//   //       fireEvent.click(checkbox);
//   //     });
//   //     renderWithRedux(
//   //       <MemoryRouter initialEntries={['/page1']}>
//   //         <FavoriteModal />
//   //       </MemoryRouter>,
//   //     );

//   //     const downloadButton = screen.getByRole('button', { name: /Download/i });
//   //     expect(downloadButton).toBeInTheDocument();
//   //   });
// });
