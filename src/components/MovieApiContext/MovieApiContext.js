import { createContext } from 'react';

const { Provider: TagsApiProvider, Consumer: TagsApiConsumer } = createContext();

export { TagsApiProvider, TagsApiConsumer };
