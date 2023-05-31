import { State as DatastreamState } from './features/datastream/datastreamSlice'

export type RootState = {
    datastream: DatastreamState;
}