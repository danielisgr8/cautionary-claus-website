import { Button, Col, Form, Input, Modal, Popconfirm, Row } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
import { addNote, deleteNote, tryAxiosRequest } from "../network-util";

interface NoteDisplayProps {
  username: string,
  notes: { id: string, message: string }[],
  loggedInUser: string,
  onNewNote: (id: string, message: string) => void,
  onNoteDeleted: (id: string) => void
}

const NoteDisplay = ({ username, notes, loggedInUser, onNewNote, onNoteDeleted }: NoteDisplayProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [noteIdToDelete, setNoteIdToDelete] = useState("");

  useEffect(() => {
    if (newNoteText !== "") {
      const message = newNoteText;
      tryAxiosRequest(async () => {
        onNewNote(await addNote(username, message, loggedInUser), message);
      });
      setNewNoteText("");
    }
  }, [newNoteText, onNewNote, username, loggedInUser]);

  useEffect(() => {
    if (noteIdToDelete !== "") {
      const id = noteIdToDelete;
      tryAxiosRequest(async () => {
        await deleteNote(username, id, loggedInUser);
        onNoteDeleted(id);
      });
      setNoteIdToDelete("");
    }
  }, [noteIdToDelete, onNoteDeleted, username, loggedInUser]);

  return (
    <div>
      <Row justify="center" align="middle" gutter={[16, 8]}>
        <Col span={8}>
          <h2 style={{ margin: "0", textAlign: "right" }}>Notes</h2>
        </Col>
        <Col span={8}>
          <div style={{ display: "flex", justifyContent: "left" }}>
            <Button type="primary" icon={<FileAddOutlined />} onClick={() => setModalVisible(true)} />
          </div>
        </Col>
      </Row>
      {notes.map((note) => (
        <Row justify="center" gutter={[0, 32]} key={note.id}>
          <Col span={20}>
            <div className="note">
              <p>{`${note.message} `.repeat(100)}</p>
            </div>
          </Col>
          <Col span={4}>
            <Popconfirm
              title="Delete this note?"
              okText="Yes"
              cancelText="Cancel"
              placement="leftBottom"
              onConfirm={() => setNoteIdToDelete(note.id)}
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Col>
        </Row>
      ))}
      <Modal
        okText="Submit"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        okButtonProps={{
          form: "newNoteForm",
          htmlType: "submit"
        }}
      >
        <Form
          id="newNoteForm"
          style={{ marginTop: "1.5rem" }}
          onFinish={(values) => {
            setModalVisible(false);
            setNewNoteText(values.message);
          }}
        >
          <Form.Item noStyle name="message">
            <Input placeholder="Write your note here!" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default NoteDisplay;
