import { Input, Form, Button } from "antd";
import React, { useState, useEffect } from "react";
import { layout, tailLayout } from "../Login/shared";
import { User } from "../models";
import { tryAxiosRequest, updateProfile } from "../network-util";

interface EditFormProps {
  profile: User,
  loggedInUser: string,
  onCancel: () => void,
  onEdit: (newValues: User) => void
}

const EditForm = ({ profile, loggedInUser, onEdit, onCancel }: EditFormProps) => {
  const [submittedValues, setSubmittedValues] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (submittedValues !== undefined && loggedInUser !== "") {
      tryAxiosRequest(async () => {
        await updateProfile(profile.username, submittedValues, loggedInUser);
        setSubmittedValues(undefined);
        onEdit({
          ...submittedValues
        });
      });
    }
  }, [submittedValues, loggedInUser, onEdit, profile]);

  if (profile.username !== loggedInUser) {
    return (
      <div>
        <h2>You can't edit someone else's profile!</h2>
        <Button type="primary" onClick={onCancel}>Go back</Button>
      </div>
    );
  }
  return (
    <Form
      {...layout}
      layout="vertical"
      name="editForm"
      id={"editForm"}
      initialValues={profile}
      onFinish={(values) => setSubmittedValues(values)}
      style={{ textAlign: "left" }}
    >
      <Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          style={{ display: "inline-block", marginBottom: "0", marginRight: "0.5rem" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          style={{ display: "inline-block", marginBottom: "0" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Address"
      >
        <Form.Item
            name={["address", "line1"]}
            style={{ marginBottom: "0.2rem" }}
        >
          <Input placeholder="Line 1" />
        </Form.Item>
        <Form.Item
            name={["address", "line2"]}
            style={{ marginBottom: "0.2rem" }}
        >
          <Input placeholder="Line 2 (optional)" />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Form.Item
          label="City"
          name={["address", "city"]}
          style={{ display: "inline-block", marginBottom: "0", marginRight: "0.5rem" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name={["address", "usState"]}
          style={{ display: "inline-block", marginBottom: "0" }}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="Zip"
        name={["address", "zip"]}
        wrapperCol={{ span: 6 }}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Form.Item style={{ display: "inline-block", marginRight: "0.5rem"}}>
          <Button onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
        <Form.Item style={{ display: "inline-block"}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
