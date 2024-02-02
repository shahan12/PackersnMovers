import React, { forwardRef } from 'react';
import "./order.css";
import authmiddleware from '../../authmiddleware';

const Template = forwardRef(({ data, identifier }, ref) => {

    const mobile = authmiddleware.decryptData(identifier);
    const extractedDate = new Date(data?.book_date).toLocaleDateString('en-GB');
    const extractedDateBooking = new Date(data?.time_of_booking).toLocaleDateString('en-GB');

    const inventoryData = data?.user_inventory;
    const addonsData = data?.addons;

    // Function to render inventory details
    const renderInventoryDetails = () => {
        return Object.keys(inventoryData).map((category) => (
            <>
                <div key={category}>
                    {category}:
                    {Object.keys(inventoryData[category]).map((item) => (
                        <div key={item}>
                            {item}:
                            {Object.keys(inventoryData[category][item]).map((item2) => (
                                <div key={item2}>
                                    {item2} x count of {inventoryData[category][item][item2].count}
                                </div>
                            ))}
                            {inventoryData[category][item].count}
                        </div>
                    ))}
                </div>
                <div className='.gap-5' />
            </>
        ));
    };
    const renderAddonsDetails = () => {
        return (
            <div>
                {Object.keys(addonsData).map((addon) => (
                    <div key={addon}>
                        {addon} x {addonsData[addon].count}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div ref={ref} className='template-container'>
            <div className='gap-0' />
            <div className='template-title'>
                <h2>SHIFTKART PACKERS AND MOVERS</h2>
                <span className='ST'>© EZY SHIFTKART TECHNOLOGY SOLUTIONS PRIVATE LIMITED</span>
            </div>
            <div className='gap-20' />
            <span className='ST-head'>Booking Details:</span>
            <hr />
            <div className='template-data'>
                <div className='ST-data-row'>
                    <span className='ST-data-1'>Mobile: <span className='bold-braces'>{mobile}</span></span>
                    <span className='ST-data-1'>Order ID: <span className='bold-braces'>{data?.order_id}</span></span>
                </div>
                <div className='ST-data-row'>
                    <span className='ST-data-1'>Date Booked On: <span className='bold-braces'>{extractedDateBooking}</span></span>
                    <span className='ST-data-1'>Time Slot Selected: <span className='bold-braces'>{data?.book_slot_time}</span></span>
                </div>
                <div className='ST-data-row'>
                    {data?.book_date && (
                        <span className='ST-data-1'>Moving Date: <span className='bold-braces'>{extractedDate}</span></span>
                    )}
                    <span className='ST-data-1'>Distance: <span className='bold-braces'>{data?.total_distance}</span></span>
                </div>
            </div>
            <div className='gap-20' />
            <span className='ST-head'>Address Details:</span>
            <hr />
            <div className='template-data'>
                <div className='ST-data-column'>
                    <span className='ST-data-1'>To Address: <span className='bold-braces'>{data?.to_address}</span></span>
                    <span className='ST-data-1'>From Address: <span className='bold-braces'>{data?.from_address}</span></span>
                    <span className='ST-data-1'>Distance: <span className='bold-braces'>{data?.total_distance}</span></span>
                </div>
            </div>

            <div className='gap-20' />
            <span className='ST-head'>Payment Details:</span>
            <hr />
            <div className='template-data'>
                <div className='ST-data-row'>
                    <span className='ST-data-1'>Transaction ID: <span className='bold-braces'>{data?.transaction_id}</span></span>
                    <span className='ST-data-1'>Payment Status: <span className='bold-braces'>{data?.final_payment_code}</span></span>
                </div>
                <div className='ST-data-row'>
                    <span className='ST-data-1'>Booking Amount: <span className='bold-braces'>₹99</span></span>
                    <span className='ST-data-1'>Total Amount: ₹<span className='bold-braces'>{data?.final_amount}</span></span>
                </div>
            </div>

            <div className='gap-20' />
            <span className='ST-head'>Additional Details:</span>
            <hr />
            <div className='template-data'>
                <div className='ST-data-row'>
                    <span className='ST-data-1'>House Type: <span className='bold-braces'>{data?.house_type}</span></span>
                    <span className='ST-data-1'>Total Inventory Items: <span className='bold-braces'>{data?.total_items}</span></span>
                </div>
                <div className='ST-data-column'>
                    <span className='ST-data-1'>Additional Boxes: <span className='bold-braces'>{data?.additional_box}</span></span>
                </div>
            </div>

            <div className='gap-20' />
            <span className='ST-head'>Cost Breakup:</span>
            <hr />
            <div className='template-data'>
                <table>
                    <tr>
                        <th>Charges</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>basePrice</td>
                        <td>₹{data?.total_cost?.basePrice}</td>
                    </tr>
                    <tr>
                        <td>floorCharges</td>
                        <td>₹{data?.total_cost?.floorCharges}</td>
                    </tr>
                    <tr>
                        <td>Add Ons Price</td>
                        <td>₹{data?.total_cost?.addonsPrice}</td>
                    </tr>
                    <tr>
                        <td>surgePrice</td>
                        <td>₹{data?.total_cost?.surgePrice}</td>
                    </tr>
                    <tr>
                        <td>Special Packaging price</td>
                        <td>₹{data?.total_cost?.packagingPrice}</td>
                    </tr>
                    <tr>
                        <td>Total Cost</td>
                        <td>₹{data?.total_cost?.surgedTotalCost}</td>
                    </tr>
                </table>
            </div>

            {(data?.user_inventory || data?.addons) && (
                <hr />
            )}

            {((inventoryData && inventoryData !== null) || (addonsData && addonsData !== null)) && (
                <div className='template-child-con'>
                    {inventoryData && (
                        <div className='temp-child'>
                            <span className='ST-head'>Inventory Details:</span>
                            <div className='template-data'>
                                <div className='ST-data-row'>{renderInventoryDetails()}</div>
                            </div>
                        </div>
                    )}
                    {addonsData && (
                        <div className='temp-child2'>
                            <span className='ST-head'>Add Ons Details:</span>
                            <div className='template-data'>
                                <div className='ST-data-row'>{renderAddonsDetails()}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}



        </div>
    );
});

export default Template;
