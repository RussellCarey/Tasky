import { rest } from "msw";
import { projectURLS } from "../constants/urls";

const returnSuccess = (data: any = {}) => {
  return {
    status: "success",
    data: {
      ...data,
    },
  };
};

export const handlers = [
  //Auth
  rest.patch(`${projectURLS.productionWithAPI}/auth/authorize`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.post(`${projectURLS.productionWithAPI}/auth/logout`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.post(`${projectURLS.productionWithAPI}/auth/login`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.post(`${projectURLS.productionWithAPI}/auth/signup`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  // Account Commands
  rest.post(`${projectURLS.productionWithAPI}/payment/create-intent`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.get(`${projectURLS.productionWithAPI}/auth/getUserData`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess({ username: "test", email: "test@test.com", ismember: "True" })));
  }),

  rest.patch(`${projectURLS.productionWithAPI}/account/changeEmail`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.patch(`${projectURLS.productionWithAPI}/account/changePassword`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.delete(`${projectURLS.productionWithAPI}/account/deleteAccount`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  // Task commands
  rest.post(`${projectURLS.productionWithAPI}/tasks/addNewTaskName`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.get(`${projectURLS.productionWithAPI}/tasks/getAllTaskNames`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess({ data: { rows: [] } })));
  }),

  rest.delete(`${projectURLS.productionWithAPI}/tasks/deleteTaskName`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.post(`${projectURLS.productionWithAPI}/tasks/addNewTaskHours`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.delete(`${projectURLS.productionWithAPI}/tasks/deleteTaskWithHours`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess()));
  }),

  rest.post(`${projectURLS.productionWithAPI}/tasks/getTasksOnDate`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess({ rows: [] })));
  }),

  rest.post(`${projectURLS.productionWithAPI}/tasks/getTasksFromDateRange`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess({ rows: [] })));
  }),

  rest.delete(`${projectURLS.productionWithAPI}/tasks/deleteTasksFromDate`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess({ rows: [] })));
  }),

  rest.delete(`${projectURLS.productionWithAPI}/tasks/deleteTasksFromDateRange`, (req, res, ctx) => {
    return res(ctx.json(returnSuccess({ rows: [] })));
  }),
];
