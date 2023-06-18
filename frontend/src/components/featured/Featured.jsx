import { useRef, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { motion } from 'framer-motion';
import './featured.css';

const Featured = () => {
  const { data, loading, error } = useFetch(
    '/hotels/countByCity?cities=berlin,madrid,london'
  );

  // width/setWidth will be used to find the
  // end of the constraints for our carousel
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    // console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <>
      <motion.div ref={carousel} className="featuredCarousel">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: 'grabbing' }}
          className="featuredInnerCarousel"
        >
          {loading ? (
            'Loading please wait'
          ) : (
            <>
              <motion.div className="featuredItem">
                <img
                  src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Berlin </h1>
                  <h2>({data[0]})</h2>
                </div>
              </motion.div>

              <motion.div className="featuredItem">
                <img
                  src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>Madrid</h1>
                  <h2>({data[1]})</h2>
                </div>
              </motion.div>
              <motion.div className="featuredItem">
                <img
                  src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>London</h1>
                  <h2>({data[2]})</h2>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Featured;
