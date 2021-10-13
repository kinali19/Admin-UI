
import { mount } from "enzyme";
import React from "react";
import Search from "../components/TableComponents/search";
import Table from "../components/TableComponents/table";
import UserInfo from "../components/userinfo";

window.scrollTo = jest.fn()

let searchComponent = mount(<Search />);
let userInfoComponent;

let exampleUsers = [
    {
    id: "1",
    name: "Test User",
    email: "test@gmail.com",
    role: "admin"
},
{
    id: "2",
    name: "Test User 2",
    email: "test2@gmail.com",
    role: "member"
}];
const checkPagination = records => {
  const offset = 0 * 10;
  return records.slice(offset, offset + 10);
}
beforeAll(() => {
  let dashboardComponent = mount(<UserInfo users={exampleUsers}/>)
  console.log(dashboardComponent)
    userInfoComponent = mount( <Table.WrappedComponent       
      />);
});

describe("Check UI for Search page component (UI)", () => {
    test("Search bar field exists in Search page", () => {
      expect(searchComponent.find('input[type="text"]').exists()).toBe(true);
    });
  });
  
  describe("Check flow for Search page component (flow)", () => {
    test("Search api call changes filteredProducts state", async () => {
      await userInfoComponent.instance().getAllRecords();
    //   userInfoComponent.state("filter") = true
      expect(userInfoComponent.state("data")[0].name).toBe(
        exampleUsers[0].name
      );
    });
})


