import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStore } from '../../store';
import cogoToast from 'cogo-toast';

const PrivateRouter = ({component: Component, ...rest}) =>{

    const {state} = useStore();

    return(
    <Route
        {...rest}
        render={props => 
            state.id !== null ?
            (
                <Component {...props}/>
            )
            :
            (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {from: props.location}
                    }}
                />
            )
        }
        />);

}

export default PrivateRouter;