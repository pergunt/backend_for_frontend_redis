import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutoComplete from "./AutoComplete";
import { products } from "mocks";

test("Fetch product categories", async () => {
  const { getCategories } = products.getMockedAPI();

  render(<AutoComplete getCategories={getCategories} />);

  const autocomplete = screen
    .getByTestId("category-autocomplete")
    .querySelector("input");

  await userEvent.click(autocomplete as HTMLInputElement);

  const liItems = await screen.findAllByRole("option");
  const values = liItems.map((li) => li.textContent);

  expect(values).toEqual(products.categories);
});
