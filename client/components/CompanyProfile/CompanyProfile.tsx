import dayjs from 'dayjs';
import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { Company } from '../../schemas/company';
import Button from 'react-bootstrap/lib/Button';
import PartnerAssigner from '../Pipeline/PartnerAssigner/PartnerAssigner';

export interface CompanyProfileProps {
  company: Company;
}

export default ({ company }: CompanyProfileProps) => {
  return (
    <>
      <Row className="cvheader cvheader1">
        <Col md="8">
          <h1>{company.name}</h1>
          <small>
            <em className="graywhite">
              Last edited{' '}
              {dayjs(company.updated_at).format('MMMM D, YYYY [at] h:mm a')}
            </em>
          </small>
        </Col>
        <Col md={{ offset: 2, width: 2 }}>
          <Button variant="primary" className="infoButton">Edit</Button>
          &nbsp;
          <Button variant="secondary" className="warningButton">Archive</Button>
        </Col>
      </Row>
      <Row className="cvheader">
        <Col md="8">
          {company.tags &&
            company.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </Col>
        <Col md="2">
          <small>Application Date</small>
          <br />
          <strong>{dayjs(company.created_at).format('MMMM D, YYYY')}</strong>
        </Col>
        <Col md="2">
          <small>Pitch Date</small>
          <br />
          <strong>{dayjs(company.created_at).format('MMMM D, YYYY')}</strong>
        </Col>
      </Row>
      <Row className="cvheader">
        <Col md="8">
          {company.company_links && (
            <p>
              {company.company_links.map(({ name, url }) => (
                <a key={name} href={url}>
                  {name}
                </a>
              ))}
            </p>
          )}
        </Col>
         <Col md="2">
          <small>Links</small>
        </Col>
         <Col md="2">
          <small>Partners</small>
          <br />
          <PartnerAssigner company={company} />
        </Col>
      </Row>
      <Row className="cvbody">
        <Col md="8">
          <div className="questions_left">
            <small>Description</small>
            <br />
            {company.description}
          </div>
          <div className="questions_left">
            <small>What’s unique about your startup?</small>
            <br />
          </div>
          <div className="questions_left">
            <small>Where are you in your fundraising process?</small>
            <br />
          </div>
          <div className="questions_left">
            <small>Were you referred by someone in the DRF community?</small>
            <br />
          </div>
          <div className="founderGroup">
            <div className="founder">
              <div className="imgDiv">
                <img src="/static/Founder_Icon.png"/>
              </div>
              <div>
                <p><a href="">Mac Miller</a></p>
                <p>University of Pennsylvania</p>
                <p className="BylineText graywhite">Undergraduate</p>
                <p className="BylineText graywhite">Male</p>
                <p className="BylineText graywhite">Caucasian, Asian, African, Latinx, Pacific Islander</p>
              </div>
            </div>
            <div className="founder">
              <div className="imgDiv">
                <img src="/static/Founder_Icon.png"/>
              </div>
              <div>
                <p><a href="">Mac Miller</a></p>
                <p>University of Pennsylvania</p>
                <p className="BylineText graywhite">Undergraduate</p>
                <p className="BylineText graywhite">Male</p>
                <p className="BylineText graywhite">Caucasian, Asian, African, Latinx, Pacific Islander</p>
              </div>
            </div>
            <div className="founder">
              <div className="imgDiv">
                <img src="/static/Founder_Icon.png"/>
              </div>
              <div>
                <p><a href="">Mac Miller</a></p>
                <p>University of Pennsylvania</p>
                <p className="BylineText graywhite">Undergraduate</p>
                <p className="BylineText graywhite">Male</p>
                <p className="BylineText graywhite">Caucasian, Asian, African, Latinx, Pacific Islander</p>
              </div>
            </div>
          </div>
        </Col>
        <Col md="4">Status: {company.status}</Col>
      </Row>
    </>
  );
};
