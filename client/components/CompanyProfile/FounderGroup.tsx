import styled from 'styled-components';
import colors from '../../stylesheets/colors.json';

const Wrapper = styled.div`
  background: ${colors.$N5};
  padding: 3%;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Founder = styled.div`
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    width: 87.5%;
  }

  p {
    margin: 0 !important;
  }
`;

const FounderIcon = styled.div`
  && {
    width: 7.5%;
  }

  img {
    width: 100%;
    margin-right: 5% !important;
  }
`;

const BylineText = styled.p`
  font-family: CircularStd-Book, Helvetica, Arial, sans-serif !important;
  font-size: 0.8rem !important;
  color: ${colors.$N50};
  line-height: 150%;
`;

export default () => (
  <Wrapper>
    <Founder>
      <FounderIcon>
        <img src="/static/Founder_Icon.png" />
      </FounderIcon>
      <div>
        <p>
          <a href="">Mac Miller</a>
        </p>
        <p>University of Pennsylvania</p>
        <BylineText>Undergraduate</BylineText>
        <BylineText>Male</BylineText>
        <BylineText>
          Caucasian, Asian, African, Latinx, Pacific Islander
        </BylineText>
      </div>
    </Founder>
    <Founder>
      <FounderIcon>
        <img src="/static/Founder_Icon.png" />
      </FounderIcon>
      <div>
        <p>
          <a href="">Mac Miller</a>
        </p>
        <p>University of Pennsylvania</p>
        <BylineText>Undergraduate</BylineText>
        <BylineText>Male</BylineText>
        <BylineText>
          Caucasian, Asian, African, Latinx, Pacific Islander
        </BylineText>
      </div>
    </Founder>
    <Founder>
      <FounderIcon>
        <img src="/static/Founder_Icon.png" />
      </FounderIcon>
      <div>
        <p>
          <a href="">Mac Miller</a>
        </p>
        <p>University of Pennsylvania</p>
        <BylineText>Undergraduate</BylineText>
        <BylineText>Male</BylineText>
        <BylineText>
          Caucasian, Asian, African, Latinx, Pacific Islander
        </BylineText>
      </div>
    </Founder>
  </Wrapper>
);
