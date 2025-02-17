import {practiceApi} from './practiceApi'
import {ContractFacilities, ContractsAll, ContractShort, NameSpecialty} from "../../../models/Practice";
import {apiSlice} from "../apiSlice";

export const rosterService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContractsAll: builder.query<ContractsAll[], void>({
            query: () => ({
                url: 'services/api-practices/contracts/all',
                method: 'GET',
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.map(({ id }) => ({ type: 'Contracts' as const, id })),
                    {type: 'Contracts', id: 'LIST'},
                ]
                :
                ['Contracts'],
            keepUnusedDataFor:1,
        }),
        getContractsShort: builder.query<ContractShort[], void>({
            query: () => ({
                url: 'services/api-practices/contracts/all-short',
                method: 'GET',
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.map(({ id }) => ({ type: 'Contracts' as const, id })),
                    {type: 'Contracts', id: 'LIST'},
                ]
                :
                ['Contracts'],
        }),
        getSpecialtyNames: builder.query<NameSpecialty[], any>({
            query: (subDivision) => ({
                url: `services/api-practices/kpfu/specialty-names${subDivision ? "?subdivisionId=" + subDivision : ''}`,
                method: 'GET',
            }),
            providesTags:  ['Contracts'],
        }),
        getSpecialtyNamesIndividualTasks: builder.query<NameSpecialty[], any>({
            query: (subDivision) => ({
                url: `services/api-practices/tasks/specialties${subDivision ? "?subdivisionId=" + subDivision : ''}`,
                method: 'GET',
            }),
            providesTags: ['Contracts'],
        }),
        getSpecialtyNamesForPractise: builder.query<any, any>({
            query: (subDivisionId) => ({
                url: `services/api-practices/tasks/specialties?subdivisionId=${subDivisionId}`,
                method: 'GET',
            }),
        }),
        getContractFacilities: builder.query<ContractFacilities[], void>({
            query: () => ({
                url: 'services/api-practices/kpfu/contract-facilities',
                method: 'GET',
            }),
            providesTags: (result) => result
                ?
                [
                    ...result.map(({ value }) => ({ type: 'Contracts' as const, value })),
                    {type: 'Contracts', id: 'LIST'},
                ]
                :
                ['Contracts'],
        })
    })
})
export const {
    useGetContractsAllQuery,
    useGetContractsShortQuery,
    useGetSpecialtyNamesQuery,
    useGetContractFacilitiesQuery,
    useGetSpecialtyNamesForPractiseQuery,
    useGetSpecialtyNamesIndividualTasksQuery
} = rosterService
