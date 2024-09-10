import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store"; // Import your actual store
import ProductCard from "./ProductCard";
import "@testing-library/jest-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ProductCard Component", () => {
  const productData = {
    id: 1,
    thumbnail: "image-url",
    description: "Product description",
    price: 19.99,
    title: "Product Title",
    rating: 4,
  };

  test("renders product card correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductCard
            tags={[]}
            sku={""}
            weight={0}
            dimensions={{ width: 23.17, height: 14.43, depth: 28.01 }}
            warrantyInformation={""}
            shippingInformation={""}
            availabilityStatus={""}
            reviews={[]}
            returnPolicy={""}
            minimumOrderQuantity={0}
            meta={{
              createdAt: "2024-05-23T08:56:21.618Z",
              updatedAt: "2024-05-23T08:56:21.618Z",
              barcode: "9164035109868",
              qrCode: "https://assets.dummyjson.com/public/qr-code.png",
            }}
            discountPercentage={0}
            stock={0}
            brand={""}
            category={""}
            images={[]}
            {...productData}
          />
        </Router>
      </Provider>
    );

    expect(screen.getByText(productData.title)).toBeInTheDocument();
    expect(
      screen.getByText(`Price: $ ${productData.price}`)
    ).toBeInTheDocument();
  });

  test('clicking "Add to Cart" button dispatches add action', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductCard
            tags={[]}
            sku={""}
            weight={0}
            dimensions={{ width: 23.17, height: 14.43, depth: 28.01 }}
            warrantyInformation={""}
            shippingInformation={""}
            availabilityStatus={""}
            reviews={[]}
            returnPolicy={""}
            minimumOrderQuantity={0}
            meta={{
              createdAt: "2024-05-23T08:56:21.618Z",
              updatedAt: "2024-05-23T08:56:21.618Z",
              barcode: "9164035109868",
              qrCode: "https://assets.dummyjson.com/public/qr-code.png",
            }}
            discountPercentage={0}
            stock={0}
            brand={""}
            category={""}
            images={[]}
            {...productData}
          />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("Add to Card"));
  });

  test('clicking "One Click Buy" button navigates to pay route', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <Router>
          <ProductCard
            tags={[]}
            sku={""}
            weight={0}
            dimensions={{ width: 23.17, height: 14.43, depth: 28.01 }}
            warrantyInformation={""}
            shippingInformation={""}
            availabilityStatus={""}
            reviews={[]}
            returnPolicy={""}
            minimumOrderQuantity={0}
            meta={{
              createdAt: "2024-05-23T08:56:21.618Z",
              updatedAt: "2024-05-23T08:56:21.618Z",
              barcode: "9164035109868",
              qrCode: "https://assets.dummyjson.com/public/qr-code.png",
            }}
            discountPercentage={0}
            stock={0}
            brand={""}
            category={""}
            images={[]}
            {...productData}
          />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("One Click Buy"));

    expect(mockNavigate).toHaveBeenCalledWith(`/pay/${productData.price}`);
  });
});
