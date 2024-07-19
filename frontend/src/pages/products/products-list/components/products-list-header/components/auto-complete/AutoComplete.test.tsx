import MockAdapter from "axios-mock-adapter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { API } from "configs";
import AutoComplete from "./AutoComplete";
import { mocks } from "../../../../duck";

const mock = new MockAdapter(API);

mock.onGet("/products/category-list").reply(() => {
  return [200, mocks.productCategories];
});

test("Fetch product categories", async () => {
  render(<AutoComplete />);

  const autocomplete = screen
    .getByTestId("category-autocomplete")
    .querySelector("input");

  await userEvent.click(autocomplete as HTMLInputElement);

  const liItems = await screen.findAllByRole("option");
  const values = liItems.map((li) => li.textContent);

  expect(values).toEqual(mocks.productCategories);
});
