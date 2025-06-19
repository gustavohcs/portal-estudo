import { Component, ElementRef, forwardRef, ViewChild, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Quill from 'quill';

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  template: `<div #editor></div>`,
  styleUrls: ['./quill-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true
    }
  ]
})
export class QuillEditorComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('editor', { static: true }) editorRef: ElementRef | undefined;
  @ViewChild('quillEditorRef', { static: false }) quillEditorRef!: ElementRef;
  quillEditor: any;
  quill: any;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    this.quill = new Quill(this.editorRef?.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          ['link'],
          [{ indent: '-1' }, { indent: '+1' }],
          ['image'],
          ['blockquote'],
          [{ 'color': [] }, { 'background': [] }],
          ['clean']
        ]
      }
    });

    this.quill.on('text-change', () => {
      const content = this.quill.root.innerHTML;
      this.onChange(content);
    });
  }

  writeValue(value: any): void {
  if (this.quill && value) {
    this.quill.root.innerHTML = value;
  }
}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
