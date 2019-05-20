import React from 'react';

interface InterfaceProps {
    comment: string
}

export const Comment = (props: InterfaceProps) => {
    return (
        <>
            {props.comment}
        </>
    );
};
