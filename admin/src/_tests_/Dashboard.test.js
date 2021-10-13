
import { mount } from "enzyme";
import React from "react";
import UserInfo from "../components/userinfo";

window.scrollTo = jest.fn()

let dashboardComponent = {};

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

beforeAll(() => {
    dashboardComponent = mount(<UserInfo users={exampleUsers} />);
});

describe("Check UI for Users component (UI)", () => {
    test("User table contains Edit button", () => {
        expect(dashboardComponent.find("button").exists()).toBe(true);
    });

    test("Dashboard contains users fields as text", () => {
        exampleUsers.map(item => {
            expect(dashboardComponent.text()).toContain(item.name);
            expect(dashboardComponent.text()).toContain(item.email);
            expect(dashboardComponent.text()).toContain(item.role);
        })
    });

});

// describe("Rate in Product component (UI)", () => {
//     it("should be an antd component", () => {
//         expect(productComponent.find(Rate).exists()).toBe(true);
//     })

//     it("should be read only", () => {
//         expect(productComponent.find(Rate).prop('disabled')).toBe(true);
//     })
// })
