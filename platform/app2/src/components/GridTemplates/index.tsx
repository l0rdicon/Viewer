
import React, {useState} from 'react';
import { Single, Doubleh, Doublev, G1x2, G2x1, G2x1a, G2x1b, G2x1c, G2x2 } from './Templates'
import Typography from '../../../../../platform/ui/src/components/Typography';
import PropTypes from 'prop-types';


const GridTemplates = ({
    selectedId,
    onSelect,
}) => {


    const selectedElement = () => {
        return ( 
            <Typography
                variant="subtitle"
                component="p"
                color="primaryLight"
                className=""
                style={{ position: "absolute",
                    top: "30%",
                    left: "27%",
                    marginLeft: "auto"}}
            >
                <span>Selected</span>
            </Typography>
        )
    }

    return (
        <div className="flex flex-row items-center justify-center">
            <div className="items-center justify-center m-auto grid grid-rows-9 gap-10 h-full min-w-full  ohif-scrollbar overflow-y-auto">
                <div className="h-32 w-32 hover:bg-secondary-light cursor-pointer p-1 rounded-lg relative" onClick={() => {
                    onSelect(1);
                }}>
                    <Single apps={[]} showApps={false} selectApp={()=>{}} />
                    { selectedId === 1 && ( selectedElement() ) }
                </div>
                <div className="h-32 w-32 hover:bg-secondary-light cursor-pointer p-1  rounded-lg relative" onClick={() => {
                    onSelect(8);
                }}>
                    <G1x2 apps={[]} showApps={false} selectApp={()=>{}} />
                    { selectedId === 8 && ( selectedElement() ) }
                </div>
                <div className="h-32 w-32 hover:bg-secondary-light cursor-pointer p-1 rounded-lg relative" onClick={() => {
                    onSelect(5);
                }}>
                    <G2x1 apps={[]} showApps={false} selectApp={()=>{}} />
                    { selectedId === 5 && ( selectedElement() ) }
                </div>
                <div className="h-32 w-32 hover:bg-secondary-light cursor-pointer p-1 rounded-lg relative" onClick={() => {
                    onSelect(6);
                }}>
                    <G2x1a apps={[]} showApps={false} selectApp={()=>{}} />
                    { selectedId === 6 && ( selectedElement() ) }
                </div>
                <div className="h-32 w-32 hover:bg-secondary-light cursor-pointer p-1 rounded-lg relative" onClick={() => {
                    onSelect(7);
                }}>
                    <G2x1b apps={[]} showApps={false} selectApp={()=>{}} />
                    { selectedId === 7 && ( selectedElement() ) }
                </div>
                <div className="h-32 w-32 hover:bg-secondary-light cursor-pointer p-1 rounded-lg relative" onClick={() => {
                    onSelect(4);
                }}>
                    <G2x2 apps={[]} showApps={false} selectApp={()=>{}} />
                    { selectedId === 4 && ( selectedElement() ) }
                </div>
                <div className="h-32 hover:bg-secondary-light cursor-pointer p-1 rounded-lg relative" onClick={() => {
                    onSelect(2);
                }}>
                    <Doubleh apps={[]} showApps={false} selectApp={()=>{}} />
                    { selectedId === 2 && ( selectedElement() ) }
                </div>
                <div className="h-32 hover:bg-secondary-light cursor-pointer p-1 rounded-lg relative" onClick={() => {
                    onSelect(3);
                }}>
                    <Doublev apps={[]} showApps={false} selectApp={()=>{}} />
                    { selectedId === 3 && ( selectedElement() ) }
                </div>
            </div>
        </div>
    )
};


GridTemplates.propTypes = {
    onSelect: PropTypes.func,
    selectedId: PropTypes.number,
}

export default GridTemplates;
