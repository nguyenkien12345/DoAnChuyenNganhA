import React from "react";
import { Carousel, Container } from "react-bootstrap";
import Header from "../Header";

function About() {
  return (
    <>
      <Header />
      <Container className="my-4 p-2">
        <Carousel>
          <Carousel.Item>
            <img
              height="300px"
              className="d-block w-100"
              src="https://nhathongminhsala.com/wp-content/uploads/2020/10/cam-bien-nhiet-do-do-am-1.png"
              alt="Cảm biến nhiệt độ – độ ẩm"
            />
            <Carousel.Caption>
              <h3 className='text-uppercase text-white fs-5 fw-bold'>Cảm biến nhiệt độ – độ ẩm</h3>
              <p className='text-white fw-bold'>Cảm biến nhiệt độ – độ ẩm giúp cảnh báo nhiệt độ và độ ẩm cho ngôi nhà của bạn trong bối cảnh biến đổi khí hậu thay đổi thất thường như hiện nay. Biến đổi khí hậu khiến cho nhiệt độ môi trường thay đổi một cách bất thường.</p>
            </Carousel.Caption>
          </Carousel.Item>
          
          <Carousel.Item>
            <img
              height="300px"
              className="d-block w-100"
              src="https://nhathongminhsala.com/wp-content/uploads/2020/10/cam-bien-khoi.jpg"
              alt="Cảm biến khói thông minh"
            />

            <Carousel.Caption>
              <h3 className='text-uppercase text-white fs-5 fw-bold'>Cảm biến khói thông minh</h3>
              <p className='text-white fw-bold'>Cảm biến khói dùng để cảnh báo phát hiện có khói khi có cháy,  báo động bằng âm thanh và báo về điện thoại người dùng. Cảm biến khói bạn có thể tùy chỉnh được độ nhạy của cảm biến, để tránh cảm biến báo động ảo gây làm phiền đến bạn.</p>
            </Carousel.Caption>
          </Carousel.Item>
          
          <Carousel.Item>
            <img
              height="300px"
              className="d-block w-100"
              src="https://nhathongminhsala.com/wp-content/uploads/2020/10/cam-bien-chuyen-dong.jpg"
              alt="Cảm biến chuyển động"
            />

            <Carousel.Caption>
              <h3 className='text-uppercase text-white fs-5 fw-bold'>Cảm biến chuyển động</h3>
              <p className='text-white fw-bold'>Cảm biến chuyển động được thiết kế với kích thước nhỏ, ngoài khả năng phát hiện chuyển động thì thiết bị còn kết hợp cảm biến ánh sáng. Cảm biến chuyển động được áp dụng vào hệ thống an ninh và hệ thống chiếu sáng cho ngôi nhà thông minh của bạn.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        
          <Carousel.Item>
            <img
              height="300px"
              className="d-block w-100"
              src="https://nhathongminhsala.com/wp-content/uploads/2020/10/6298671cv13d-1247x400.png"
              alt="Cảm Biến Cửa"
            />

            <Carousel.Caption>
              <h3 className='text-uppercase text-white fs-5 fw-bold'>Cảm Biến Cửa</h3>
              <p className='text-white fw-bold'>Cảm biến cửa được thiết kế gồm 2 thiết bị nhỏ dùng để gắn vào cánh cửa. Được áp dụng cho cửa nhà, cửa sổ, cửa tủ… Bạn có thể linh hoạt để áp dụng vào hệ thống nhà thông minh của mình, để bật đèn khi cửa mở hoặc để báo có người mở cửa ở khu vực đó. Rất thuận tiện cho bạn để sử dụng. Đặc biệt áp dụng vào hệ thống an ninh chống trộm cho ngôi nhà.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}

export default About;
