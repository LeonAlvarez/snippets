import React from "react";
import Link from "gatsby-link";

class Footer extends React.Component {
  render() {
    return (
      <div className="absolute pin-b w-full bg-grey-lighter p-8">
        <div className="sm:flex mb-4">
          <div className="sm:w-1/4 h-auto">
              <div className="text-orange mb-2">Arrayy</div>
              <ul className="list-reset leading-normal">
                  <li className="hover:text-orange text-grey-darker">One</li>
                  <li className="hover:text-orange text-grey-darker">Two</li>
                  <li className="hover:text-orange text-grey-darker">Three</li>
              </ul>
          </div>
          <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
              <div className="text-blue mb-2">Types</div>
              <ul className="list-reset leading-normal">
                  <li className="hover:text-blue text-grey-darker">One</li>
                  <li className="hover:text-blue text-grey-darker">Two</li>
                  <li className="hover:text-blue text-grey-darker">Three</li>
              </ul>
          </div>
          <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
              <div className="text-green-dark mb-2">Math</div>
              <ul className="list-reset leading-normal">
                  <li className="hover:text-green-dark text-grey-darker">One</li>
                  <li className="hover:text-green-dark text-grey-darker">Two</li>
                  <li className="hover:text-green-dark text-grey-darker">Three</li>
              </ul>
          </div>
          <div className="sm:w-1/2 sm:mt-0 mt-8 h-auto">
              <div className="text-red-light mb-2">Newsletter</div>
              <p className="text-grey-darker leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consectetur. </p>
              <div className="mt-4 flex">
                  <input type="text" className="p-2 border border-grey-light round text-grey-dark text-sm h-auto" placeholder="Your email address"/>
                  <button className="bg-orange text-white rounded-sm h-auto text-xs p-3">Subscribe</button>
              </div>
            </div>
        </div>
      </div>
    );
  }
};

export default Footer;