import React from 'react';
import Loadable from 'react-loadable';

import Loading from './Loading';

const LoadableComponent = Loadable({
    loader: () => import('./OSMExtractionMap.jsx'),
    loading: Loading,
});

export default function LoadableMap() {
    return <LoadableComponent />;
}
