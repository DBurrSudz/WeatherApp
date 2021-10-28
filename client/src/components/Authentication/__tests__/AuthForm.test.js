import { render, cleanup, fireEvent } from "@testing-library/react";
import AuthForm from "../AuthForm";
import Input from "../Input";
import * as reactRedux from "react-redux";
import * as actions from "../../../store/actions/user";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";



describe("<AuthForm />", () => {
    let renderedDOM;
    let getByTestId;

    beforeEach(() => {
        const configuredMockStore = configureMockStore([thunk]);
        const mockStore = configuredMockStore({});

        renderedDOM = render(<Provider store={mockStore}><AuthForm /></Provider>);
        getByTestId = renderedDOM.getByTestId;
    });

    afterEach(cleanup);

    describe("tests that the authentication form and inputs are rendering properly.", () => {
        test('should test that the Input component is working properly', () => {
            const renderedDOM = render(<Input name="test" id="test" label="TestComponent" type="test" testID="testing" />);

            const inputField = renderedDOM.getByTestId("testing");
            expect(inputField).toBeInTheDocument();

        });

        test('should test that the form was rendered', () => {

            const form = getByTestId("signin-form")
            //Checking that the form was rendered.
            expect(form).toBeInTheDocument();
        });


        test('should render email and password fields when form is in login mode', () => {

            expect(getByTestId("form-heading")).toHaveTextContent("Sign In");
            expect(getByTestId("email-field")).toBeInTheDocument();
            expect(getByTestId("password-field")).toBeInTheDocument();
        });

        test('should render every field when form is in registration mode', () => {

            fireEvent.click(getByTestId("change-state"));

            expect(getByTestId("form-heading")).toHaveTextContent("Sign Up");

            //Checking that the firstname field was rendered.
            expect(getByTestId("firstname-field")).toBeInTheDocument();
            //Checking that the lastname field was rendered.
            expect(getByTestId("lastname-field")).toBeInTheDocument();
            //Checking that the email field was rendered.
            expect(getByTestId("email-field")).toBeInTheDocument();
            //Checking that the password field was rendered.
            expect(getByTestId("password-field")).toBeInTheDocument();
            //Checking that the confirm password field was rendered.
            expect(getByTestId("confirm-field")).toBeInTheDocument();
            //Checking that the submit button was rendered.
            expect(getByTestId("submit-button")).toBeInTheDocument();
        });
    });


    describe("simulating user authentication and registration", () => {
        let dispatchFunction;
        let mockedLogin, mockedRegistration;

        beforeEach(() => {
            const mockedDispatch = jest.spyOn(reactRedux, "useDispatch");
            mockedLogin = jest.spyOn(actions, 'login');
            mockedRegistration = jest.spyOn(actions, 'register');
            dispatchFunction = jest.fn();
            mockedDispatch.mockReturnValue(dispatchFunction);
        });

        test("should simulate a user logging in", () => {

            expect(dispatchFunction).not.toHaveBeenCalled();

            fireEvent.change(getByTestId("email-field"), { target: { value: "jonhB@gmail.com" } });
            fireEvent.change(getByTestId("password-field"), { target: { value: "superman" } });

            fireEvent.submit(getByTestId("submit-button"));

            expect(dispatchFunction).toHaveBeenCalled();
            expect(mockedLogin).toHaveBeenCalled();
            expect(mockedLogin.mock.calls[0][0]).toEqual({ firstname: "", lastname: "", password: "superman", confirm_password: "", email: "jonhB@gmail.com" });
        });

        test.skip("should simulate a user registering with valid information", () => {
            expect(dispatchFunction).not.toHaveBeenCalled();

            fireEvent.click(getByTestId("change-state"));
            fireEvent.change(getByTestId("firstname-field"), { target: { value: "John" } });
            fireEvent.change(getByTestId("lastname-field"), { target: { value: "Simon" } });
            fireEvent.change(getByTestId("email-field"), { target: { value: "jSimon@gmail.com" } });
            fireEvent.change(getByTestId("password-field"), { target: { value: "!Wordpress$1" } });
            fireEvent.change(getByTestId("confirm-field"), { target: { value: "!Wordpress$1" } });
            fireEvent.submit(getByTestId("submit-button"));

            expect(dispatchFunction).toHaveBeenCalled();
            expect(mockedRegistration).toHaveBeenCalled();
            expect(mockedRegistration.mock.calls[0][0]).toEqual({ firstname: "John", lastname: "Simon", password: "!Wordpress$1", confirm_password: "!Wordpress$1", email: "jSimon@gmail.com" });
        });
    });

});