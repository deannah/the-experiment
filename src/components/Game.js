import { StackNavigator } from 'react-navigation';

import CharacterCreator from './screens/CharacterCreator';
import Environment from './screens/Environment';

const routes = {
    CharacterCreator: {
        screen: CharacterCreator,
    },
    Environment: {
        screen: Environment,
    },
};

const config = {
    headerMode: 'none',
};

export default StackNavigator(routes, config);
