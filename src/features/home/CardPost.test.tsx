import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import { useAppDispatch } from "../../app/hooks";
import { deleteFromPostList } from "./homeSlice";
import CardPost from "./CardPost";

// eslint-disable-next-line react-hooks/rules-of-hooks
// const dispatch = useAppDispatch();

const postDataTest = {
    id: 1,
    profileIMG: 'https://viajes.nationalgeographic.com.es/medio/2020/07/17/samana_ef337a39_800x800.jpg',
    title: 'imagen TEST',
    userId: 1,
    postImg: 'https://viajes.nationalgeographic.com.es/medio/2020/07/17/samana_ef337a39_800x800.jpg',
    text: 'texto del post TEST',
}

test('The component is rendering', () => {

    const component = render(
        <CardPost
            key={postDataTest.id}
            id={postDataTest.id}
            profileIMG={postDataTest.profileIMG}
            title={postDataTest.title}
            userId={postDataTest.userId}
            postImg={postDataTest.profileIMG}
            text={postDataTest.text}
            onPostDeleted={() => {}}
        />
    )

    component.getByText('imagen TEST');
    component.getByText('texto del post TEST');
    
})

test ('Delete is working', () => {
    const mockHandler = jest.fn();
    
    const component = render(
        <CardPost
            key={postDataTest.id}
            id={postDataTest.id}
            profileIMG={postDataTest.profileIMG}
            title={postDataTest.title}
            userId={postDataTest.userId}
            postImg={postDataTest.profileIMG}
            text={postDataTest.text}
            onPostDeleted={
                mockHandler()
                // dispatch(deleteFromPostList(postDataTest.id));
              }
        />
    )


    const button = component.queryByTestId('deletePost')
    button&&fireEvent.click(button)

    //The function is called 1 time
    expect(mockHandler.mock.calls).toHaveBeenCalledTimes(1);
})



// describe('CardPost Tests', () => {
//     const postDataTest = {
//         id: 1,
//         profileIMG: 'https://viajes.nationalgeographic.com.es/medio/2020/07/17/samana_ef337a39_800x800.jpg',
//         title: 'imagen TEST',
//         userId: 1,
//         postImg: 'https://viajes.nationalgeographic.com.es/medio/2020/07/17/samana_ef337a39_800x800.jpg',
//         text: 'texto del post TEST',
//     }
//     let component: RenderResult<typeof import("@testing-library/dom/types/queries")>
//     beforeEach(()=>{
//         component = render(
//             <CardPost
//                 key={postDataTest.id}
//                 id={postDataTest.id}
//                 profileIMG={postDataTest.profileIMG}
//                 title={postDataTest.title}
//                 userId={postDataTest.userId}
//                 postImg={postDataTest.profileIMG}
//                 text={postDataTest.text}
//                 onPostDeleted={(id) => {console.log(id)}}
//             />
//         )
//     })
//     test('The component is rendering', () => {

   

//         component.getByText('imagen TEST');
//         component.getByText('texto del post TEST');
        
//     })
    
//     test ('Delete is working', () => {
//         const mockHandler = jest.fn();
    
//         const button = component.queryByTestId('deletePost')
//         button&&fireEvent.click(button)
    
//         //The function is called 1 time
//         expect(mockHandler.mock.calls).toHaveBeenCalledTimes(1);
//     })

// })





