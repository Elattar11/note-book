import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoteService } from 'src/app/core/services/auth/note/note.service';
declare var $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _NoteService:NoteService , private _FormBuilder:FormBuilder){}
  ngOnInit(): void {
    this.getAllNotes();
  }
  notes : any[] = [];

  addNoteForm = this._FormBuilder.group({
    title : [''],
    content : [''],
  })


  updateNoteForm = this._FormBuilder.group({
    _id:[''],
    title : [''],
    content : [''],
  })

  getAllNotes()
  {
    this._NoteService.getNotes().subscribe({
      next:(res) => {
        if(res.msg == 'done')
        {
          this.notes = res.notes;
        }
      }
    })
  }


  deleteNote(id:any)
  {
    this._NoteService.deleteNote(id).subscribe({
      next:(res) =>
      {
        if(res.msg == 'done')
        {
          alert('Note Deleted Successfully ...');
          this.getAllNotes();
        }
      }
    })
  }

  setupdateNote(note : any)
  {
    this.updateNoteForm.patchValue(note);
    $('#updateModal').modal('show');
  }
  updateNote()
  {
    const {_id , title , content } = this.updateNoteForm.value;

    this._NoteService.updateNote({title , content} , _id).subscribe({
      next:(res) =>
      {
        if(res.msg == 'done')
        {
          this.updateNoteForm.reset();
          $('#updateModal').modal('hide');
          this.getAllNotes();
          alert('Note Updated Successfully ...')
        }
      }
    })
  }

  addNote()
  {
    this._NoteService.addNote(this.addNoteForm.value).subscribe({
      next:(res) =>
      {
        if(res.msg == 'done')
        {
          this.addNoteForm.reset();
          $('#exampleModal').modal('hide');
          this.getAllNotes();
          alert('Note Added Successfully ...')
        }
      }
    })
  }
}
