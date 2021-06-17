import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ActiveTodo from '../pages/ActiveTodo';
import CompletedTodo from '../pages/CompletedTodo';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/Active" component={ActiveTodo}/>
        <Route path="/Completed" component={CompletedTodo}/>
    </Switch>
)

export default Routes;