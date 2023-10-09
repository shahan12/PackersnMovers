import React from "react";
import "./header.css";
import dottedLine from '../../images/dottedLine.png';
import orangeLine from '../../images/orangeline.png';
import dottedSelected from '../../images/dottedselectedTruck.png';


function Header(props) {

  const renderProgress = (Prog, stage) => {
    let renderable = null;
    if (stage === 'first') {
      renderable = (
        <img src={Prog === 'requirement' ? dottedSelected : orangeLine} />
      );
    } else if (stage === 'sec') {
        renderable = (
          <img src={Prog === 'inventory' ? dottedSelected : Prog === 'requirement' ? dottedLine : (Prog === 'book' ? orangeLine : '')} />
        );
    } else if (stage === 'last') {
        renderable = (
          <img src={Prog === 'book' ? dottedSelected : dottedLine} />

        );
    }
    return renderable;
  };

  return <div className="header-component-wrapper">
    <span>Fill Requirements</span>
      {renderProgress(props.progress, 'first')}
    <span>Select Inventory</span>
      {renderProgress(props.progress, 'sec')}
    <span>Book Slot</span>
      {renderProgress(props.progress, 'last')}
    <span>Confirm</span>
  </div>

}

export default Header;
