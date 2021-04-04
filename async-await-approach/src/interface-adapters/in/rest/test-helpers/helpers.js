module.exports = () => {
  const Server = () => {
    const routedMethods = {};
    const addRouterParamaters = (...args) => {
      const argsWithoutRoute = [ ...args ];
      argsWithoutRoute.shift();

      routedMethods[args[0]] = { };

      argsWithoutRoute.forEach(element => {
        routedMethods[args[0]][element.name] = element;
      });
    };
    
    const post = addRouterParamaters;
    const put = addRouterParamaters;
    const retrieveRouthedMethodByRouter = ({ route, methodName }) => routedMethods[route][methodName];

    return {
      retrieveRouthedMethodByRouter,
      post,
      put
    };
  }; 
  
  const Request = ({ body, params }) => {
    return {
      body,
      params
    };
  };
  
  const Response = () => { 
    const mockedSendFunction = jest.fn();
    const mockedStatusFunction = jest.fn().mockImplementation(() => ({ send: mockedSendFunction }));

    const send = mockedSendFunction;
    const status = mockedStatusFunction;

    return {
      mockedSendFunction,
      mockedStatusFunction,
      status,
      send
    };
  };

  return {
    Server,
    Response,
    Request
  };
}